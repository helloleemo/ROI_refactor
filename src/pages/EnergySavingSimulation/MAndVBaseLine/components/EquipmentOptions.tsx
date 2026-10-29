import { TextField, MenuItem } from "@mui/material";

interface EquipmentOptionsProps {
    selectedEquipmentName: string;
    handleEquipmentChange: (equipmentName: string) => void;
    equipmentNames: string[];
}

export const EquipmentOptions = ({ selectedEquipmentName, handleEquipmentChange, equipmentNames }: EquipmentOptionsProps) => {
    return (
        <TextField
            size="small"
            select
            value={selectedEquipmentName}
            onChange={(event) => handleEquipmentChange(event.target.value)}
            disabled={equipmentNames.length === 0}
        >
            {equipmentNames.map((name, key) => (
                <MenuItem key={`${name}-${key}`} value={name}>{name}</MenuItem>
            ))}

        </TextField>

    );
};