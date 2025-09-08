import { z } from "zod";

/* -------------------------------- Enums ------------------------------- */

export const CategoryEnum = z.enum([
    "Sticky Rice",
    "Cake Box",
    "Combo",
    "Sweets",
    "House Special",
    "Toppings",
    "Drinks",
    "Sweet Soup",
    "Banh Mi",
]);
export type Category = z.infer<typeof CategoryEnum>;

export const NoteEnum = z.enum(["NEW", "HIGHLIGHT"]);
export type Note = z.infer<typeof NoteEnum>;

export const DayEnum = z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]);
export type Weekday = z.infer<typeof DayEnum>;

/* --------------------------- Common preprocessors --------------------------- */

// Coerce string | number to number (and ensure non-negative)
const asNumber = z.preprocess(
    (v) => (typeof v === "string" ? Number(v) : v),
    z.number().nonnegative()
);

// Accept http(s) URL strings; allow undefined/empty
const asUrl = z
    .string()
    .url()
    .or(z.literal("").transform(() => undefined))
    .optional();

// Simple 24h "HH:MM" guard (keep loose to allow “11:00”, “9:30” if you want)
export const TimeString = z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, "Time must be HH:MM")
    .optional();

/* ------------------------------- Menu Item ------------------------------- */

export const MenuItemSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    vietName: z.string().min(1, "Vietnamese name is required"),
    description: z.string().optional(),
    price: asNumber,
    // Allow strict known categories OR gracefully accept unknown future ones
    category: CategoryEnum.or(z.string()),
    photo: asUrl,
    notes: NoteEnum.or(z.string()).optional(),
    sortOrder: z.number().optional(),
    available: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
});
export type TMenuItem = z.infer<typeof MenuItemSchema>;

export const MenuListSchema = z.array(MenuItemSchema);

/* ----------------------------- Opening Hours ----------------------------- */

export const OpeningHourSchema = z.object({
    id: z.string(),
    day: DayEnum.or(z.string()),
    open: z.string(),
    close: z.string(),
    closed: z.boolean(),
    notes: z.string().optional(),
    sort: z.number().optional(), // 1–7 Mon–Sun
});
export type TOpeningHour = z.infer<typeof OpeningHourSchema>;

export const OpeningHoursListSchema = z.array(OpeningHourSchema);

/* ----------------------------- Announcements ----------------------------- */

export const AnnouncementSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    details: z.string().optional(),
    media: asUrl, // image/video URL if provided
    sort: z.number().optional(),
    active: z.boolean().default(true),
});
export type TAnnouncement = z.infer<typeof AnnouncementSchema>;

export const AnnouncementListSchema = z.array(AnnouncementSchema);

/* ----------------------------- Batch validators ----------------------------- */

export function assertMenu(items: unknown): TMenuItem[] {
    const parsed = MenuListSchema.safeParse(items);
    if (!parsed.success) {
        // Log detailed issues once; keep throw message succinct
        console.error("Menu validation errors:", parsed.error.flatten());
        throw new Error("Menu data failed validation");
    }
    return parsed.data;
}

export function assertHours(items: unknown): TOpeningHour[] {
    const parsed = OpeningHoursListSchema.safeParse(items);
    if (!parsed.success) {
        console.error("Hours validation errors:", parsed.error.flatten());
        throw new Error("Opening Hours data failed validation");
    }
    return parsed.data;
}

export function assertAnnouncements(items: unknown): TAnnouncement[] {
    const parsed = AnnouncementListSchema.safeParse(items);
    if (!parsed.success) {
        console.error(
            "Announcements validation errors:",
            parsed.error.flatten()
        );
        throw new Error("Announcements data failed validation");
    }
    return parsed.data;
}
