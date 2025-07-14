/**
 * SettingsPanel component displays settings for a selected node.
 * 
 * @file SettingsPanel.jsx
 * @module SettingsPanel
 * 
 * @param {Object} props - Component props
 * @param {Object} props.node - The selected node object. Should contain `id`, `type`, and `data`.
 * @param {Function} props.onDelete - Callback function to delete the node.
 * @param {Function} props.setSelectedNode - Function to set the selected node (used to deselect).
 * 
 * @returns {JSX.Element|null} The settings panel for the node, or null if no node is selected.
 */

import { IoMdArrowBack  } from "react-icons/io";
import { nodeSettingsMap } from "./nodes/nodeRegistry";

const SettingsPanel = ({ node, onDelete, setSelectedNode }) => {
    if (!node) return null;
    const SpecificSettings = nodeSettingsMap[node.type] || (() => <p>No Settings</p>);

    return (
        <div className="bg-white border-l-2 w-72 overflow-auto h-[calc(100vh-3.2rem)]">
            <div className="flex flex-row items-center justify-start gap-4 border-y w-full">
                <div
                    onClick={() => setSelectedNode(null)}
                    className="m-2 w-8 h-8 rounded-full hover:bg-slate-100 cursor-pointer focus:bg-slate-300"
                ><IoMdArrowBack className="m-2" /></div>
                <h2 className="text-lg font-bold my-2">{node.data?.label || node.type}</h2>
            </div>
            <div className="m-4">
                <p><strong>ID:</strong> {node.id}</p>
                <SpecificSettings id={node.id} data={node.data} />
            </div>
            <button
                onClick={onDelete}
                className="mt-6 mx-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
                Delete Node
            </button>
        </div>
    )
}

export default SettingsPanel;