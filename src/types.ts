export type FieldType = "text" | "number" | "select" | "textarea" | "checkbox" | "switch";

export interface FormOption {
  label: string;
  value: string | number;
}

export interface FormFieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  options?: FormOption[];
  description?: string;
}

export interface FormSchema {
  id: string;
  title?: string;
  fields: FormFieldSchema[];
}
