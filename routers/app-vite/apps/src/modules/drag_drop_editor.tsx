import React, { useState, useCallback, useRef } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

// Cấu hình
const COMPONENT_TYPES = {
    BUTTON: 'button',
    INPUT: 'input',
    TEXT: 'text',
    CONTAINER: 'container',
};

// Dữ liệu ban đầu
const initialComponents = {
    'root': {
        id: 'root',
        type: COMPONENT_TYPES.CONTAINER,
        parentId: null,
        childrenIds: [],
        props: { style: { position: 'relative', width: '100%', height: '100%', minHeight: '100vh' } },
    }
};

// --- Các thành phần UI phụ ---

const SidebarItem = ({ type, label, icon }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `sidebar-${type}`,
        data: { type },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="component bg-gray-50 border border-gray-300 p-3 rounded-lg flex items-center space-x-3 hover:bg-blue-50 hover:shadow-md cursor-grab active:cursor-grabbing"
        >
            {icon}
            <span className="font-medium">{label}</span>
        </div>
    );
};

const ResizeHandle = ({ onMouseDown, direction }) => (
    <div
        className={`absolute bg-blue-500 border border-white rounded-full w-3 h-3 -m-1.5 z-30 ${direction}`}
        onMouseDown={(e) => onMouseDown(e, direction)}
    />
);

const GuideLine = ({ line }) => {
    const commonLineStyle = "absolute bg-pink-500 z-50 pointer-events-none";
    const commonDistStyle = "absolute z-50 pointer-events-none";
    const textStyle = { top: -8, left: '50%', transform: 'translateX(-50%)' };
    const textVStyle = { left: -8, top: '50%', transform: 'translateY(-50%) rotate(-90deg)' };

    switch (line.type) {
        case 'vertical':
            return <div className={commonLineStyle} style={{ left: line.x - 0.5, top: line.y1, width: '1px', height: line.y2 - line.y1 }} />;
        case 'horizontal':
            return <div className={commonLineStyle} style={{ top: line.y - 0.5, left: line.x1, height: '1px', width: line.x2 - line.x1 }} />;
        case 'dist-h':
            return (
                <div className={commonDistStyle} style={{ left: line.x1, top: line.y - 0.5, width: line.dist, height: '1px' }}>
                    <div className="absolute w-full border-t border-dashed border-pink-500" />
                    <div className="absolute h-2 w-px bg-pink-500 -left-px -top-1" />
                    <div className="absolute h-2 w-px bg-pink-500 -right-px -top-1" />
                    <span className="absolute text-xs text-pink-500 bg-white/80 px-1 rounded" style={textStyle}>{Math.round(line.dist)}</span>
                </div>
            );
        case 'dist-v':
            return (
                <div className={commonDistStyle} style={{ top: line.y1, left: line.x - 0.5, height: line.dist, width: '1px' }}>
                    <div className="absolute h-full border-l border-dashed border-pink-500" />
                    <div className="absolute w-2 h-px bg-pink-500 -top-px -left-1" />
                    <div className="absolute w-2 h-px bg-pink-500 -bottom-px -left-1" />
                    <span className="absolute text-xs text-pink-500 bg-white/80 px-1 rounded" style={textVStyle}>{Math.round(line.dist)}</span>
                </div>
            );
        default: return null;
    }
}

const GuideLines = ({ lines }) => <>{lines.map((line, i) => <GuideLine key={i} line={line} />)}</>;


// --- Render component dựa trên type ---
const ComponentRenderer = ({ type, props }) => {
    switch (type) {
        case COMPONENT_TYPES.BUTTON:
            return <button {...props} className="w-full h-full bg-blue-500 text-white font-bold rounded-md shadow-sm pointer-events-none">{props.text}</button>;
        case COMPONENT_TYPES.INPUT:
            return <input {...props} className="w-full h-full border border-gray-300 rounded-md p-2 pointer-events-none" />;
        case COMPONENT_TYPES.TEXT:
            return <p {...props} className="w-full h-full text-base text-gray-700 pointer-events-none">{props.text}</p>;
        case COMPONENT_TYPES.CONTAINER:
            return <div {...props} className="w-full h-full bg-white/50 border border-gray-300 rounded-md pointer-events-none"></div>;
        default:
            return null;
    }
};

// --- Component trên Canvas (kết hợp Draggable và Droppable) ---
const CanvasComponent = ({ id, components, onUpdate, onSelect, selectedId, setGuideLines }) => {
    const component = components[id];
    const { type, props, childrenIds } = component;
    const isRoot = id === 'root';

    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
        id,
        disabled: isRoot,
    });

    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id,
        disabled: type !== COMPONENT_TYPES.CONTAINER,
    });

    const combineRefs = (node) => {
        setDraggableNodeRef(node);
        setDroppableNodeRef(node);
    };

    const isSelected = id === selectedId;

    const wrapperStyle = isRoot ? props.style : {
        ...props.style,
        position: 'absolute',
        outline: isSelected ? '2px solid #3b82f6' : (isOver ? '2px dashed #3b82f6' : 'none'),
        outlineOffset: '2px',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    
    const handleResize = useCallback((e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        const startStyle = { ...props.style };
        const startMouse = { x: e.clientX, y: e.clientY };
        const onMouseMove = (moveE) => {
            const dx = moveE.clientX - startMouse.x;
            const dy = moveE.clientY - startMouse.y;
            let newStyle = { ...startStyle };
            if (direction.includes('right')) newStyle.width = Math.max(20, startStyle.width + dx);
            if (direction.includes('bottom')) newStyle.height = Math.max(20, startStyle.height + dy);
            if (direction.includes('left')) {
                newStyle.width = Math.max(20, startStyle.width - dx);
                newStyle.left = startStyle.left + dx;
            }
            if (direction.includes('top')) {
                newStyle.height = Math.max(20, startStyle.height - dy);
                newStyle.top = startStyle.top + dy;
            }
            onUpdate(id, { ...props, style: newStyle });
        };
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [id, props, onUpdate]);

    return (
        <div
            ref={combineRefs}
            style={wrapperStyle}
            {...listeners}
            {...attributes}
            onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            className={!isRoot ? 'cursor-move' : ''}
        >
            <ComponentRenderer type={type} props={props} />
            {childrenIds && childrenIds.map(childId => (
                <CanvasComponent
                    key={childId} id={childId} components={components}
                    onUpdate={onUpdate} onSelect={onSelect} selectedId={selectedId}
                    setGuideLines={setGuideLines}
                />
            ))}
            {isSelected && !isRoot && (
                <>
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-nwse-resize top-0 left-0" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-ns-resize top-0 left-1/2" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-nesw-resize top-0 right-0" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-ew-resize top-1/2 left-0" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-ew-resize top-1/2 right-0" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-nesw-resize bottom-0 left-0" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-ns-resize bottom-0 left-1/2" />
                    <ResizeHandle onMouseDown={handleResize} direction="cursor-nwse-resize bottom-0 right-0" />
                </>
            )}
        </div>
    );
};

const PropertiesPanel = ({ selectedId, components, onUpdate, onDelete }) => {
    if (!selectedId || selectedId === 'root') {
        return <p className="text-gray-500 italic">Chọn một thành phần để xem thuộc tính.</p>;
    }
    const component = components[selectedId];
    const { props } = component;
    const handlePropChange = (propName, value) => onUpdate(selectedId, { ...props, [propName]: value });
    const handleStyleChange = (styleName, value) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;
        onUpdate(selectedId, { ...props, style: { ...props.style, [styleName]: numValue } });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold border-b pb-2">{`Thuộc tính: ${component.type}`}</h3>
            <PropertyInput label="ID" value={selectedId} readOnly />
            {component.type === 'button' && <PropertyInput label="Nội dung" value={props.text} onChange={(e) => handlePropChange('text', e.target.value)} />}
            {component.type === 'text' && <PropertyInput label="Nội dung" value={props.text} onChange={(e) => handlePropChange('text', e.target.value)} type="textarea" />}
            {component.type === 'input' && (
                <>
                    <PropertyInput label="Placeholder" value={props.placeholder} onChange={(e) => handlePropChange('placeholder', e.target.value)} />
                    <PropertyInput label="Giá trị" value={props.value} onChange={(e) => handlePropChange('value', e.target.value)} />
                </>
            )}
            <h4 className="text-md font-semibold border-b pb-2 pt-4">Vị trí & Kích thước</h4>
            <div className="grid grid-cols-2 gap-2">
                <PropertyInput label="Left (x)" type="number" value={props.style.left} onChange={(e) => handleStyleChange('left', e.target.value)} />
                <PropertyInput label="Top (y)" type="number" value={props.style.top} onChange={(e) => handleStyleChange('top', e.target.value)} />
                <PropertyInput label="Width" type="number" value={props.style.width} onChange={(e) => handleStyleChange('width', e.target.value)} />
                <PropertyInput label="Height" type="number" value={props.style.height} onChange={(e) => handleStyleChange('height', e.target.value)} />
            </div>
            <button onClick={() => onDelete(selectedId)} className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 mt-6">Xóa thành phần</button>
        </div>
    );
};

const PropertyInput = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {props.type === 'textarea' ?
            <textarea {...props} className="mt-1 w-full border border-gray-300 rounded-md p-2" rows="3" /> :
            <input {...props} className={`mt-1 w-full border border-gray-300 rounded-md p-2 ${props.readOnly ? 'bg-gray-100' : ''}`} />
        }
    </div>
);


export default function App() {
    const [components, setComponents] = useState(initialComponents);
    const [selectedId, setSelectedId] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [guideLines, setGuideLines] = useState([]);
    const canvasRef = useRef(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const activeComponent = activeId ? (components[activeId] || { id: activeId, type: activeId.replace('sidebar-', ''), props: {} }) : null;

    const handleAddComponent = useCallback((type, parentId, position) => {
        const newId = `${type}-${Date.now()}`;
        const defaultProps = { style: { left: position.left, top: position.top, width: 150, height: 40 } };
        switch (type) {
            case COMPONENT_TYPES.BUTTON: defaultProps.text = 'Nhấn vào tôi'; break;
            case COMPONENT_TYPES.INPUT: defaultProps.placeholder = 'Nhập văn bản...'; defaultProps.value = ''; defaultProps.style.width = 200; break;
            case COMPONENT_TYPES.TEXT: defaultProps.text = 'Đây là văn bản'; defaultProps.style.height = 20; break;
            case COMPONENT_TYPES.CONTAINER: defaultProps.style.width = 300; defaultProps.style.height = 200; break;
        }
        setComponents(prev => {
            const newComponent = { id: newId, type, parentId, childrenIds: [], props: defaultProps };
            const parent = { ...prev[parentId], childrenIds: [...prev[parentId].childrenIds, newId] };
            return { ...prev, [newId]: newComponent, [parentId]: parent };
        });
        setSelectedId(newId);
    }, []);

    const handleUpdateComponent = useCallback((id, newProps) => setComponents(prev => ({ ...prev, [id]: { ...prev[id], props: newProps } })), []);

    const handleDeleteComponent = useCallback((id) => {
        setSelectedId(null);
        setComponents(prev => {
            const newComps = { ...prev };
            const toDelete = newComps[id];
            const q = [id];
            while (q.length > 0) {
                const currentId = q.shift();
                if (newComps[currentId]) {
                    q.push(...newComps[currentId].childrenIds);
                    delete newComps[currentId];
                }
            }
            if (toDelete.parentId && newComps[toDelete.parentId]) {
                const parent = newComps[toDelete.parentId];
                newComps[toDelete.parentId] = { ...parent, childrenIds: parent.childrenIds.filter(cid => cid !== id) };
            }
            return newComps;
        });
    }, []);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
        setSelectedId(null);
    };

    const handleDragMove = ({ active, delta }) => {
        const activeComp = components[active.id];
        if (!activeComp) return;

        const newLeft = activeComp.props.style.left + delta.x;
        const newTop = activeComp.props.style.top + delta.y;
        
        const SNAP_THRESHOLD = 5;
        const activeGuides = [];
        const draggedRect = { left: newLeft, top: newTop, width: activeComp.props.style.width, height: activeComp.props.style.height, right: newLeft + activeComp.props.style.width, bottom: newTop + activeComp.props.style.height, hCenter: newLeft + activeComp.props.style.width / 2, vCenter: newTop + activeComp.props.style.height / 2 };
        const parent = components[activeComp.parentId];
        if (parent) {
             parent.childrenIds.filter(childId => childId !== active.id).forEach(siblingId => {
                const sr = components[siblingId].props.style;
                const siblingRect = { ...sr, right: sr.left + sr.width, bottom: sr.top + sr.height, hCenter: sr.left + sr.width / 2, vCenter: sr.top + sr.height / 2 };
                const checkSnap = (draggedEdge, targetEdge, type) => {
                    if (Math.abs(draggedEdge - targetEdge) < SNAP_THRESHOLD) {
                        if (type === 'v') activeGuides.push({ type: 'vertical', x: targetEdge, y1: Math.min(draggedRect.top, siblingRect.top), y2: Math.max(draggedRect.bottom, siblingRect.bottom) });
                        if (type === 'h') activeGuides.push({ type: 'horizontal', y: targetEdge, x1: Math.min(draggedRect.left, siblingRect.left), x2: Math.max(draggedRect.right, siblingRect.right) });
                    }
                };
                ['left', 'hCenter', 'right'].forEach(key => checkSnap(draggedRect[key], siblingRect[key], 'v'));
                ['top', 'vCenter', 'bottom'].forEach(key => checkSnap(draggedRect[key], siblingRect[key], 'h'));
            });
        }
        setGuideLines(activeGuides);
    };

    const handleDragEnd = ({ active, over, delta }) => {
        setActiveId(null);
        setGuideLines([]);
        if (!over) return;

        const targetParentId = over.id;
        const isSidebarItem = String(active.id).startsWith('sidebar-');

        if (isSidebarItem) {
            const type = active.data.current.type;
            const canvasRect = canvasRef.current.getBoundingClientRect();
             
             const parentComponent = components[targetParentId];
             // Lấy DOM element của container cha để tính toán vị trí tương đối
             const parentNode = document.querySelector(`[data-id='${targetParentId}']`) || canvasRef.current;
             const parentRect = parentNode.getBoundingClientRect();

             // Vị trí con trỏ tương đối với viewport
             const dropX = active.activatorEvent.clientX;
             const dropY = active.activatorEvent.clientY;
             
             // Vị trí thả cuối cùng là vị trí con trỏ trừ đi vị trí của container cha
             const left = dropX - parentRect.left;
             const top = dropY - parentRect.top;

            handleAddComponent(type, targetParentId, { left, top });
        } else {
            const component = components[active.id];
            const newParentId = over.id;
            const oldParentId = component.parentId;
            
            let newLeft = component.props.style.left + delta.x;
            let newTop = component.props.style.top + delta.y;
            
            setComponents(prev => {
                const newComps = { ...prev };
                const updatedComp = { ...newComps[active.id] };
                updatedComp.props = { ...updatedComp.props, style: { ...updatedComp.props.style, left: newLeft, top: newTop } };

                if (newParentId !== oldParentId && newComps[newParentId].type === COMPONENT_TYPES.CONTAINER) {
                    const oldParentRect = (document.querySelector(`[data-id='${oldParentId}']`) || canvasRef.current).getBoundingClientRect();
                    const newParentRect = (document.querySelector(`[data-id='${newParentId}']`) || canvasRef.current).getBoundingClientRect();
                    
                    updatedComp.parentId = newParentId;
                    updatedComp.props.style.left = (oldParentRect.left + newLeft) - newParentRect.left;
                    updatedComp.props.style.top = (oldParentRect.top + newTop) - newParentRect.top;

                    const oldParent = { ...newComps[oldParentId], childrenIds: newComps[oldParentId].childrenIds.filter(id => id !== active.id) };
                    const newParent = { ...newComps[newParentId], childrenIds: [...newComps[newParentId].childrenIds, active.id] };
                    newComps[oldParentId] = oldParent;
                    newComps[newParentId] = newParent;
                }
                newComps[active.id] = updatedComp;
                return newComps;
            });
            setSelectedId(active.id);
        }
    };
    
    // Thêm data-id để query DOM element
    const CanvasComponentWithId = (props) => (
        <div data-id={props.id}>
            <CanvasComponent {...props} />
        </div>
    );

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
            <div className="flex h-screen bg-gray-100 text-gray-800 font-sans">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-4 border-r border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Thành phần</h2>
                    <div className="space-y-3">
                        <SidebarItem type={COMPONENT_TYPES.CONTAINER} label="Container" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>} />
                        <SidebarItem type={COMPONENT_TYPES.BUTTON} label="Nút (Button)" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z" /></svg>} />
                        <SidebarItem type={COMPONENT_TYPES.INPUT} label="Ô nhập liệu" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>} />
                        <SidebarItem type={COMPONENT_TYPES.TEXT} label="Văn bản (Text)" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10m16-10v10M8 7h8m-8 5h8m-8 5h8" /></svg>} />
                    </div>
                </aside>

                {/* Canvas */}
                <main ref={canvasRef} id="canvas-main" className="flex-1 relative overflow-auto bg-gray-200" onClick={() => setSelectedId(null)}>
                    <CanvasComponentWithId id="root" components={components} onUpdate={handleUpdateComponent} onSelect={setSelectedId} selectedId={selectedId} setGuideLines={setGuideLines} />
                    <GuideLines lines={guideLines} />
                </main>

                {/* Properties Panel */}
                <aside className="w-72 bg-white p-4 border-l border-gray-200 shadow-sm overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Thuộc tính</h2>
                    <PropertiesPanel selectedId={selectedId} components={components} onUpdate={handleUpdateComponent} onDelete={handleDeleteComponent} />
                </aside>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div style={{...activeComponent.props.style, pointerEvents: "none"}}>
                        <ComponentRenderer type={activeComponent.type} props={activeComponent.props} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}




export { App as Drag }