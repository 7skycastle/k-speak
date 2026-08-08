import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CultureCourseSetup } from "./CultureCourseSetup";

const renderCultureSetup = (onSave = vi.fn()) =>
  render(<CultureCourseSetup enrollment={undefined} progress={{}} onSave={onSave} packId="us-en" />);

describe("CultureCourseSetup", () => {
  it("requires different primary and sampler packs", () => {
    const onSave = vi.fn();
    renderCultureSetup(onSave);

    fireEvent.click(screen.getByLabelText("K-Pop primary"));

    expect(screen.getByLabelText("K-Pop sampler")).toBeDisabled();
    fireEvent.click(screen.getByLabelText("K-Drama sampler"));
    fireEvent.click(screen.getByRole("button", { name: "Create my route" }));

    expect(onSave).toHaveBeenCalledWith({ primaryPackId: "k-pop", samplerPackId: "k-drama" });
  });

  it("shows the original-content notice before starting", () => {
    renderCultureSetup();

    expect(screen.getByText(/K-Speak original learning scenes/i)).toBeInTheDocument();
  });

  it("allows Beauty and Webtoon as different route packs", () => {
    const onSave = vi.fn();
    renderCultureSetup(onSave);

    fireEvent.click(screen.getByLabelText("K-Beauty primary"));
    expect(screen.getByLabelText("K-Beauty sampler")).toBeDisabled();
    fireEvent.click(screen.getByLabelText("K-Webtoon sampler"));
    fireEvent.click(screen.getByRole("button", { name: "Create my route" }));

    expect(onSave).toHaveBeenCalledWith({ primaryPackId: "k-beauty", samplerPackId: "k-webtoon" });
  });
});
