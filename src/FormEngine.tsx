import React, { useState, type FormEvent } from "react";
import { Button } from "@meocox/ui";
import type { FormSchema } from "./types.js";

export interface FormEngineProps {
  schema: FormSchema;
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
  submitText?: string;
}

export const FormEngine: React.FC<FormEngineProps> = ({
  schema,
  initialValues = {},
  onSubmit,
  submitText = "提交",
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const defaultData: Record<string, any> = {};
    for (const field of schema.fields) {
      if (initialValues[field.name] !== undefined) {
        defaultData[field.name] = initialValues[field.name];
      } else if (field.defaultValue !== undefined) {
        defaultData[field.name] = field.defaultValue;
      }
    }
    return defaultData;
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.title && (
        <h2 className="text-xl font-bold text-slate-800">{schema.title}</h2>
      )}
      <div className="space-y-3">
        {schema.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={formData[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === "select" ? (
              <select
                value={formData[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {field.description && (
              <span className="text-xs text-slate-500">{field.description}</span>
            )}
          </div>
        ))}
      </div>
      <div className="pt-2">
        <Button type="submit" variant="primary">
          {submitText}
        </Button>
      </div>
    </form>
  );
};
