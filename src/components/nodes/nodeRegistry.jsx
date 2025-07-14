/**
 * Registry for node types, settings, palette, and default data used in the application.
 * 
 * @module nodeRegistry
 */

import MessageNode, { MessageNodeSettings } from "./MessageNode";

/**
 * Maps node type identifiers to their corresponding React components.
 * @type {Object.<string, React.ComponentType>}
 */
export const nodeTypes = {
    messageNode: MessageNode,
}

/**
 * Maps node type identifiers to their corresponding settings components.
 * @type {Object.<string, React.ComponentType>}
 */
export const nodeSettingsMap = {
    messageNode: MessageNodeSettings,
}

/**
 * Defines the palette of available node types for selection in the UI.
 * @type {Array.<{type: string, label: string}>}
 */
export const nodePalette = [
    {
        type: 'messageNode',
        label: 'Message',
    },
]

/**
 * Provides default data for each node type, given a node id.
 * @type {Object.<string, function(string): Object>}
 */
export const nodeDefaultData = {
    messageNode: (id) => ({ nodeTextValue: `Text Message ${id}` }),
}