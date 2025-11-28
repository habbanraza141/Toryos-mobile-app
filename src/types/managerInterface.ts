import { Moment } from "moment";
import { priority } from "./generalInterface";
import { components } from "@EHSNavigator/types";

export type FormDataType = {
  departmentId: string;
  incidentId: string;
  incidentRefId?: string;
  leadId: string;
  assigneeIds: string[];
  priority: priority | '';
  title: string;
  description: string;
  date: Moment | null;
  time: Moment | null;
  isEdit?: boolean;
  correctiveAction?: components['schemas']["CorrectiveActions"];
};