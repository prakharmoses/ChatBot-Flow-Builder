import { memo, useCallback } from 'react';
import { Handle, Position } from "@xyflow/react";
/**
 * MessageNode.jsx
 * 
 * This file defines the MessageNode React component for use with @xyflow/react (React Flow).
 * The node displays a message input field and handles changes to its value.
 * It also exports MessageNodeSettings, a settings panel for editing the node's message text.
 * 
 * Components:
 * - MessageNode: Renders a node with handles for connections, an icon, and a text input.
 * - MessageNodeSettings: Renders a settings panel with a textarea for editing the node's message.
 * 
 * Props:
 * - id: Unique identifier for the node.
 * - data: Object containing node data, including nodeTextValue and onChange handler.
 * - isConnectable: Boolean indicating if node handles are connectable.
 * - selected: Boolean indicating if the node is selected (for styling).
 * 
 * Styling:
 * - Uses Tailwind CSS classes for layout and appearance.
 * - Node changes appearance when selected.
 * 
 * Handles:
 * - Left (target) and right (source) handles for connecting nodes.
 * 
 * Image:
 * - Displays an icon from ./nodeImage/textNodeImg.png.
 * 
 * Memoization:
 * - MessageNode is memoized for performance optimization.
 */
const HANDLE_DIMENSION = 10;

const MessageNode = ({ id, data, isConnectable, selected }) => {
    const nodeTextValue = data.nodeTextValue || '';

    const handleNodeTextValChange = useCallback((e) => {
        const updatedData = {
            ...data,
            nodeTextValue: e.target.value,
            onChange: data.onChange,
        };

        data.onChange(id, updatedData);
    }, [data, id]);

    return (
        <div className={`rounded-lg border-2 border-black shadow-xl ${selected ? 'bg-blue-50 shadow-2xl border-2 border-blue-600' : 'bg-white'}`}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{ width: HANDLE_DIMENSION, height: HANDLE_DIMENSION, borderRadius: '50%' }}
            />
            <Handle
                type='source'
                position={Position.Right}
                isConnectable={isConnectable}
                style={{ width: HANDLE_DIMENSION, height: HANDLE_DIMENSION, borderRadius: '50%' }}
            />
            <div className="flex flex-col items-center h-[4.101rem]">
                <div className="bg-green-400 flex flex-row items-center gap-4 p-2 w-72 h-[50%] rounded-t-lg">
                    <img
                        src="./nodeImage/textNodeImg.png"
                        alt="The meassage icon"
                        className='w-10'
                    />
                    <span className="font-bold">Send Message</span>
                </div>
                <input
                    type="text"
                    className='text-sm w-full h-full px-2 rounded-b-lg'
                    value={nodeTextValue}
                    onChange={handleNodeTextValChange}
                />
            </div>
        </div>
    )
};

export default memo(MessageNode);

export const MessageNodeSettings = ({ id, data }) => {
    const nodeTextValue = data.nodeTextValue || '';

    const handleChange = useCallback((e) => {
        const updatedData = {
            ...data,
            nodeTextValue: e.target.value,
            onChange: data.onChange,
        };

        data.onChange(id, updatedData);
    }, [data, id]);

    return (
        <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="textNodeVal" className="font-semibold text-sm">Text Message</label>
            <textarea
                value={nodeTextValue}
                onChange={handleChange}
                className='p-2 border rounded text-sm w-full'
            />
        </div>
    )
}