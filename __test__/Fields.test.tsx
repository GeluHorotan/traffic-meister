import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Fields from "@/components/Fields";

describe("Fields", () => {
  it("renders the select fields", () => {
    render(<Fields vehicleData={[]} vehicleCopy={[]} />);

    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(3);
  });

  it("renders three disabled fields", () => {
    render(<Fields vehicleData={[]} vehicleCopy={[]} />);
    const selects = screen.getAllByRole("combobox");

    for (let i = 0; i < 3; i++) {
      expect(selects[i]).toBeDisabled();
    }
  });

  it("renders three disabled fields", () => {
    render(<Fields vehicleData={[]} vehicleCopy={[]} />);
    const selects = screen.getAllByRole("combobox");

    for (let i = 0; i < 3; i++) {
      expect(selects[i]).toBeDisabled();
    }
  });
});
