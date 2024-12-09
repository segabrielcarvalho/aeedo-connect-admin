"use client";

import Dropdown from "@/components/Dropdown";
import SelectInput from "@/components/Form/SelectInput";
import { MenuItem } from "@headlessui/react";
import { useUsersContext } from "../context/UsersContext";

export const UsersTableFilterButton = () => {
  const {
    get: { filterUserType },
    set: { setFilterUserType },
  } = useUsersContext();

  return (
    <Dropdown label="Filtros">
      <div className="py-1">
        <MenuItem>
          <SelectInput<"admin" | "donor" | "recipient" | null>
            label="Tipo de usuário"
            options={[
              { value: "donor", label: "Doador" },
              { value: "recipient", label: "Receptor" },
              { value: null, label: "Todos" },
            ]}
            name="user_type"
            placeholder="Selecione um tipo"
            value={filterUserType}
            onChange={(value) => setFilterUserType(value)}
          />
        </MenuItem>
      </div>
    </Dropdown>
  );
};
