import { EventEmitter } from "node:events";

type EventMap = {
  "vote.proposed": { voteId: string; cooperativeId: string };
  "vote.approved": { voteId: string; cooperativeId: string; subject: string };
  "vote.expired": { voteId: string; cooperativeId: string; subject: string };
};

export const eventBus = new EventEmitter();

export function emit<T extends keyof EventMap>(
  event: T,
  payload: EventMap[T],
) {
  eventBus.emit(event, payload);
}

export function on<T extends keyof EventMap>(
  event: T,
  handler: (payload: EventMap[T]) => void,
) {
  eventBus.on(event, handler);
}
