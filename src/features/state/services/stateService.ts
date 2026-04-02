import type { UpdateStateRequest, StateDto } from "../types/state";

const STATE_API_URL = "http://localhost:5226/api/master/states";

export async function getStates(): Promise<StateDto[]> {
  const response = await fetch(STATE_API_URL);

  if (!response.ok) {
    throw new Error("Failed to load states.");
  }

  const data: StateDto[] = await response.json();
  return data;
}

export async function updateStates(request: UpdateStateRequest): Promise<StateDto[]> {
  const response = await fetch(`${STATE_API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to save state changes.");
  }

  const result: { message: string; data: StateDto[] } = await response.json();
  return result.data;
}