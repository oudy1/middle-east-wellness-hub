import { describe, it, expect } from "vitest";
import { parseCsv } from "../parseCsv";

describe("volunteer CSV export reader", () => {
  it("reads a Google Sheets export with a byte-order mark and CRLF endings", () => {
    const csv = "\uFEFFTimestamp,Name,Email\r\n11/10/2026 9:00:00,Sara Ali,sara@example.com\r\n";
    expect(parseCsv(csv)).toEqual({
      headers: ["Timestamp", "Name", "Email"],
      rows: [["11/10/2026 9:00:00", "Sara Ali", "sara@example.com"]],
    });
  });
  it("keeps commas, quotes and line breaks that are inside quoted answers", () => {
    const csv = 'Name,Why volunteer\n"Omar","I want to help, ""a lot""\nand often"\n';
    expect(parseCsv(csv).rows).toEqual([["Omar", 'I want to help, "a lot"\nand often']]);
  });
  it("keeps Arabic answers and skips blank rows", () => {
    const csv = "الاسم,المدينة\nليلى,تورونتو\n,\n\n";
    expect(parseCsv(csv)).toEqual({ headers: ["الاسم", "المدينة"], rows: [["ليلى", "تورونتو"]] });
  });
});
