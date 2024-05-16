import {Role} from "../types/model.ts";

class RoleConverter {
    public static convertToEnumFormat(str: string): Role {
        return Role[str.toUpperCase() as keyof typeof Role];
    }
}

export default RoleConverter