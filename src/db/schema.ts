import { relations } from "drizzle-orm";
import { uuid, integer, pgTable, text, varchar, timestamp, time, pgEnum } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey()
});

export const userTableRelations = relations(userTable, ({ many }) => ({
    usersToClinics: many(userToClinicsTable)
}));

export const userToClinicsTable = pgTable("user_to_clinics", {
    userId: uuid("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});

export const userToClinicsTableRelations = relations(userToClinicsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userToClinicsTable.userId],
        references: [userTable.id]
    }),
    clinic: one(clinicsTable, {
        fields: [userToClinicsTable.clinicId],
        references: [clinicsTable.id]
    })
}));

export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appointments: many(appointmentsTable),
    usersToClinics: many(userToClinicsTable)
}))

export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    avatarImageUrl: text("avatar_image_url"),
    availableFromWeekday: integer("available_from_weekday").notNull(),
    availableToWeekday: integer("available_to_weekday").notNull(),
    availableFromTime: time("available_from_time").notNull(),
    availableToTime: time("available_to_time").notNull(),
    appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
    specialty: text("specialty").notNull(), 
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" })
});

export const doctorsTableRelations = relations(doctorsTable, ({ many, one }) => ({
    clinic: one(clinicsTable, {
        fields: [doctorsTable.clinicId],
        references: [clinicsTable.id]
    }),
    appointments: many(appointmentsTable)
}));

export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    patientId: uuid("patient_id").notNull().references(() => patientsTable.id, { onDelete: "cascade" }),
    doctorId: uuid("doctor_id").notNull().references(() => doctorsTable.id, { onDelete: "cascade" }),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" })
});

export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    patient: one(patientsTable, {
        fields: [appointmentsTable.patientId],
        references: [patientsTable.id]
    }),
    doctor: one(doctorsTable, {
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id]
    }),
    clinic: one(clinicsTable, {
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id]
    })
}));

export const patientSexEnum = pgEnum("patient_sex_enum", ["male", "female"]);
export const patientsTable = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: varchar("phone_number").notNull(),
    sex: patientSexEnum("sex").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" })
});

export const patientsTableRelations = relations(patientsTable, ({ many, one }) => ({
    clinic: one(clinicsTable, {
        fields: [patientsTable.clinicId],
        references: [clinicsTable.id]
    }),
    appointments: many(appointmentsTable)
}));