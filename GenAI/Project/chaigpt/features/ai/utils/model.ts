import {openrouter} from '@openrouter/ai-sdk-provider';

export const DEFAULT_CHAT_MODEL = "openrouter/free";

/**
 * Returns an Openrouter free language model instance for chat completions.
 *
 * @param modelId - Optional model identifier; falls back to {@link DEFAULT_CHAT_MODEL}.
 */
export function getChatModel(modelId?: string | null) {
    return openrouter(modelId || DEFAULT_CHAT_MODEL)
}