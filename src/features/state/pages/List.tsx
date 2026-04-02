import { useEffect, useState } from "react";
import "./List.css";
import type { StateDto } from "../types/state";
import { getStates, updateStates } from "../services/stateService";
import type { GridColumn } from "../../../shared/components/grid";
import TextBox from "../../../shared/components/textbox";
import Button from "../../../shared/components/buttons";
import Loader from "../../../shared/components/loader";
import Grid from "../../../shared/components/grid";


function createNewStateRow(): StateDto {
  return {
    id: 0,
    name: "",
    code: "",
  };
}

export default function StateList() {
  const [states, setStates] = useState<StateDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    loadStatesData();
  }, []);

  async function loadStatesData(): Promise<void> {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response: StateDto[] = await getStates();
      setStates(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong while loading states.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleAddRow(): void {
    setStates((previousStates: StateDto[]) => {
      return [...previousStates, createNewStateRow()];
    });
  }

  function handleDeleteRow(index: number): void {
    setStates((previousStates: StateDto[]) => {
      return previousStates.filter((_, currentIndex: number) => currentIndex !== index);
    });
  }

  function handleStateNameChange(index: number, value: string): void {
    setStates((previousStates: StateDto[]) => {
      const updatedStates: StateDto[] = [...previousStates];
      updatedStates[index] = {
        ...updatedStates[index],
        name: value,
      };
      return updatedStates;
    });
  }

  function handleStateCodeChange(index: number, value: string): void {
    setStates((previousStates: StateDto[]) => {
      const updatedStates: StateDto[] = [...previousStates];
      updatedStates[index] = {
        ...updatedStates[index],
        code: value,
      };
      return updatedStates;
    });
  }

  function validateRows(): string {
    let rowNumber: number;

    for (rowNumber = 0; rowNumber < states.length; rowNumber++) {
      const row: StateDto = states[rowNumber];

      if (row.name.trim() === "") {
        return `State Name is required in row ${rowNumber + 1}.`;
      }

      if (row.code.trim() === "") {
        return `State Code is required in row ${rowNumber + 1}.`;
      }
    }

    return "";
  }

  async function handleSaveChanges(): Promise<void> {
    const validationError: string = validateRows();

    if (validationError !== "") {
      setErrorMessage(validationError);
      setSuccessMessage("");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const savedData: StateDto[] = await updateStates({
        states: states.map((state: StateDto) => ({
          id: state.id,
          name: state.name.trim(),
          code: state.code.trim(),
        })),
      });

      setStates(savedData);
      setSuccessMessage("Changes saved successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong while saving changes.");
      }
      setSuccessMessage("");
    } finally {
      setSaving(false);
    }
  }

  const columns: GridColumn<StateDto>[] = [
    {
      key: "id",
      title: "Id",
      render: (row: StateDto) => (
        <TextBox
          value={row.id === 0 ? "" : String(row.id)}
          readOnly={true}
          placeholder="Auto"
        />
      ),
    },
    {
      key: "Name",
      title: "Name",
      render: (row: StateDto, index: number) => (
        <TextBox
          value={row.name}
          placeholder="Enter state name"
          onChange={(value: string) => handleStateNameChange(index, value)}
        />
      ),
    },
    {
      key: "Code",
      title: " Code",
      render: (row: StateDto, index: number) => (
        <TextBox
          value={row.code}
          placeholder="Enter state code"
          onChange={(value: string) => handleStateCodeChange(index, value)}
        />
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_row: StateDto, index: number) => (
        <Button
          caption="Delete"
          onClick={() => handleDeleteRow(index)}
        />
      ),
    },
  ];

  if (loading) {
    return <Loader text="Loading states..." />;
  }

  return (
    <div className="state-table-page">
      <div className="state-table-header">
        <div>
          <h1 className="state-table-title">State Table</h1>
          <p className="state-table-subtitle">
            Add, edit, and delete rows locally. Changes will be saved only when
            you click Save Changes.
          </p>
        </div>
      </div>

      <div className="state-table-actions">
        <Button caption="Add Row"onClick={handleAddRow} />
        <Button
          caption={saving ? "Saving..." : "Save Changes"}
          onClick={handleSaveChanges}
          disabled={saving}
        />
      </div>

      {errorMessage !== "" && (
        <div className="state-message state-message-error">{errorMessage}</div>
      )}

      {successMessage !== "" && (
        <div className="state-message state-message-success">{successMessage}</div>
      )}

      <div className="">
        Refreshing without saving will restore the original database data.
      </div>

      <Grid<StateDto>
        data={states}
        columns={columns}
        emptyMessage="No states available."
      />
    </div>
  );
}