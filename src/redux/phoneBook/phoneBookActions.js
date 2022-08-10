import { createAction } from "@reduxjs/toolkit";

export const actionAddContacts = createAction("contacts/add")

export const removeContacts = createAction("contacts/remove")

export const filterContacts = createAction("contacts/filter")

