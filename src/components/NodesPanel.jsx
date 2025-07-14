/**
 * NodesPanel component displays a palette of draggable node types for use in a React Flow diagram.
 *
 * Imports node types from the nodePalette and renders each as a draggable item.
 * When a node is dragged, its type is set in the dataTransfer object for React Flow integration.
 *
 * @component
 * @returns {JSX.Element} The rendered panel of draggable node types.
 */

import { nodePalette } from './nodes/nodeRegistry';

const NodesPanel = () => {
    const onDragStart = (e, nodeType) => {
        e.dataTransfer.setData('application/reactFlow', nodeType);
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="p-4 bg-white border-l-2 h-[calc(100vh-3.2rem)] grid grid-cols-2 justify-center items-start overflow-scroll">
            {nodePalette.map((node) => (
                <div
                    key={node.type}
                    className="p-2 mb-4 w-28 bg-white border-2 rounded-md shadow hover:bg-gray-200 cursor-grab text-center flex flex-col gap-2 text-blue-800 border-blue-800 font-bold items-center"
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                >
                    <img
                        src="./nodeImage/textNodeImg.png"
                        alt="Message"
                        className="w-10"
                    />
                    {node.label}
                </div>
            ))}
        </div>
    );
};

export default NodesPanel;