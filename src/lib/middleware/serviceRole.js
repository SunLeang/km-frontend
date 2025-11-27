import { user } from "$providers/stores/kauth";
import { get } from "svelte/store";
export const ensureServiceRole = (role) => {
    const localUser = get(user);
    return localUser.serviceRoles.includes(role);
}