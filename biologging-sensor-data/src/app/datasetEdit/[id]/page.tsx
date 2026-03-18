"use client";

import React, { useEffect, useState } from "react";
import './datasetEdit.css';
import useToken from '@/app/login/useToken';
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import { getDataset, updateDataset } from "@/api/dataset/api";
import { AxiosError } from "axios";
import { DetailLink } from "@/components/links";

import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, formatISO } from "date-fns";

// Hidden and readonly fields
const HIDDEN_FIELDS = ['id', '_id', 'recordsStatistics', 'versions'];
const READONLY_FIELDS = ['datasetID', 'projectID', 'sensorType', 'valuesMeasured', 'unitReported', 'dateCreated', 'dateUpdated'];



function convertEmptyToNull(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertEmptyToNull);
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertEmptyToNull(v)])
    );
  }

  // Convert empty string → null
  if (obj === "") return null;

  return obj;
}

function removeNestedIds(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeNestedIds);
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([k]) => k !== "id")  // remove nested id fields
        .map(([k, v]) => [k, removeNestedIds(v)])
    );
  }

  return obj;
}


export default function DatasetEditPage() {
  //const { id } = useParams();
  const params = useParams();
  const rawId = params?.id; // could be string | string[] | undefined
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const { token, loading } = useToken();
  const [accessDenied, setAccessDenied] = useState(false);

  // Effect 1: Check authentication first
  useEffect(() => {

    // Don't do anything while token is loading
    if (loading) return;

    if (token === null) {
      setAccessDenied(true);

      setTimeout(() => {
        window.location.href = `/detail/${id}`;
      }, 1500);
    }
  }, [token, loading, id]);


  const [datasetLoading, setDatasetLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dataset, setDataset] = useState<any>(null);

  const { control, register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<any>({
    defaultValues: {},
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);


  // transform a dateformat with timezone to the last 16 characters like "2009-07-01T12:00"
  const formatForInput = (value: string | null | undefined) => {
    if (!value) return "";

    const pad = (n: number) => String(n).padStart(2, "0");
    const date = new Date(value);
    const newDate=date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    "T" + pad(date.getHours()) +
    ":" + pad(date.getMinutes());

    return newDate; // "2009-07-01T12:00"
  };


  function setDatetimeFields(obj: any, path = "") {
    Object.entries(obj).forEach(([key, value]) => {
      const fullPath = path ? `${path}.${key}` : key;

      if (value && typeof value === "string" && fullPath.includes("Datetime")) {
        // Convert to "YYYY-MM-DDTHH:MM" format for datetime-local
        setValue(fullPath, formatForInput(value));
      } else if (value && typeof value === "object") {
        // recurse for nested objects
        setDatetimeFields(value, fullPath);
      }
    });
  }

  // Fetch dataset and populate form
  useEffect(() => {
    if (!id) return;
    if (!token) return; //  prevents fetching while token is loading
    if (accessDenied) return; // do not fetch if not allowed

    const fetchDataset = async () => {
      setDatasetLoading(true);
      const response = await getDataset(id);
      if (response instanceof AxiosError) {
        setDatasetLoading(false);
        setError(true);
        return;
      }

      setError(false);
      setDataset(response);
      reset(response); // populate form including arrays

      // Automatically set all datetime fields (top-level and nested)
      setDatetimeFields(response);


      setDatasetLoading(false);
    };

    fetchDataset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token, accessDenied, reset, setValue]);


  // If user has no access, show message and DO NOT run the fetch effect
  if (accessDenied) {
      return (
          <div className="alert alert-danger mt-5 text-center">
              You must be logged in to edit this dataset. Redirecting…
          </div>
      );
  }


  const formatToISO = (value: string): string => {
    const date = new Date(value);

    // Guard against invalid dates
    if (isNaN(date.getTime())) {
      console.warn("Invalid date:", value);
      return value;
    }

    return date.toISOString();
  };

  const filterObjects = (key: string, value: any): any => {
    // 1️⃣ Handle arrays
    if (Array.isArray(value)) {
      return value.map((item, index) => filterObjects(key, item));
    }

    // 2️⃣ Handle objects
    if (value !== null && typeof value === "object") {
      const result: any = {}; // start as object

      Object.entries(value).forEach(([key2, value2]) => {
        result[key2] = filterObjects(key2, value2);
      });

      return result;
    }

    // 3️⃣ Handle datetime strings
    if (typeof value === "string" && key.includes("Datetime")) {
      return formatToISO(value);
    }

    // 4️⃣ Default case (primitive)
    return value;
  };


  const onSubmit = async (data: any) => {
    // Reset status block
    setStatusMessage(null);
    setStatusType(null);

    const cleaned = convertEmptyToNull(data);
    const cleanedNoIds = removeNestedIds(cleaned);

    try {
      const filtered: any = {};
      Object.entries(cleanedNoIds).forEach(([key, value]) => {

        if (!HIDDEN_FIELDS.includes(key) && !READONLY_FIELDS.includes(key)) {
          filtered[key]=filterObjects(key, value);
        }
        //filtered[key] = value;
      });

      const result = await updateDataset(id, filtered);

      if (result instanceof AxiosError) {
        setStatusMessage("Failed to update dataset: " + result.message);
        setStatusType("error");
        return;
      }

      // Success
      setStatusMessage("Dataset updated successfully!");
      setStatusType("success");

    } catch (error: any) {
      console.error("UPDATE ERROR:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to update dataset. Check console for details.";

      setStatusMessage(message);
      setStatusType("error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (datasetLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dataset.</p>;
  if (!dataset) return null;

  // Helper component for array-of-objects fields
  const ArrayEditor = ({ name }: { name: string }) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
      <div className="mb-6 p-4 rounded-lg bg-gray-50 border">
        <h5 className="text-uppercase" style={{ marginTop: "30px" }}>{name} (array) :</h5>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="ml-6 mb-4 pl-4 border-l-4 border-blue-200 bg-white rounded-md shadow-sm p-3"
          >
            <div className="flex justify-between items-start">
              <button
                type="button"
                onClick={() => remove(index)}
                className=""
                style={{ backgroundColor: '#fff', color: '#686868', marginTop: "10px"}}
              >
                - Remove Item #{index + 1}
              </button>
            </div>

            {Object.keys(field).map((subKey) => {
              if (HIDDEN_FIELDS.includes(subKey) || READONLY_FIELDS.includes(subKey)) return null;

              return (
                <div key={subKey} className="mb-2">
                  <small className="d-block text-uppercase">{subKey}</small>
                  <input
                    {...register(`${name}.${index}.${subKey}`)}
                    defaultValue={(field as Record<string, any>)[subKey] ?? ""}
                    className="form-control mt-2"
                    onInput={(e) => {
                      e.currentTarget.classList.add("input-modified");
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const firstItem = dataset[name]?.[0];
            if (firstItem && typeof firstItem === "object") {
              const template = Object.fromEntries(Object.keys(firstItem).map((k) => [k, ""]));
              append(template);
            } else {
              append({});
            }
          }}
          className=""
          style={{ backgroundColor: '#fff', color: '#686868', marginTop: "10px"}}
        >
          + Add new {name}
        </button>
      </div>
    );
  };

  // Determine which array fields exist
  const arrayFields = Object.entries(dataset).filter(
    ([key, value]) => Array.isArray(value) && value.length > 0 && typeof value[0] === "object"
  );

  // Render all other non-array fields
  const nonArrayFields = Object.entries(dataset).filter(
    ([key, value]) => !Array.isArray(value) || value.length === 0 || typeof value[0] !== "object"
  );

  // add the class modified to the field edited by the user
  const handleInputModified = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    // Case 1: e is a string → treat as fieldName
    if (typeof e === "string") {
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${e}"]`
      );
      if (el) {
            console.log("ok ajout");
        el.classList.add("input-modified");
      }
      return;
    }

    // Case 2: e.currentTarget is null/undefined → do nothing
    if (!e.currentTarget) return;

    // Case 3: default behavior
    console.log("normal");
    e.currentTarget.classList.add("input-modified");
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">

      <div>
        <DetailLink datasetId={id}>Back</DetailLink>
      </div>

      <h1 className="text-3xl font-bold mb-6">Edit Dataset #{id}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {nonArrayFields.map(([key, value]) => {
          if (HIDDEN_FIELDS.includes(key)) return null;

          const isReadonly = READONLY_FIELDS.includes(key);

          // Recursive renderer for nested objects
          const renderField = (val: any, path: string[]) => {
            const fieldName = path.join(".");
            const displayLabel = path[path.length - 1];
            const isDateTime = typeof val === "string" && val.includes("T") && val.endsWith("Z");

            // Nested object
            if (val && typeof val === "object" && !Array.isArray(val)) {
              return (
                <div
                  key={fieldName}
                  className="ml-4 mb-3 pl-2 border-l-2 border-gray-200"  style={{ marginTop: "20px" }}
                >
                  <small className="d-block text-uppercase">
                    {displayLabel} (object) :
                  </small>

                  {Object.entries(val).map(([subKey, subValue]) =>
                    renderField(subValue, [...path, subKey])
                  )}
                </div>
              );
            }

            // Array (shown read-only here — arrays handled by ArrayEditor)
            if (Array.isArray(val)) {
              return (
                <div key={fieldName} className="mb-3">
                  <small className="d-block text-uppercase font-semibold mb-1">
                    {displayLabel}
                  </small>

                  <input
                    className="form-control mt-1"
                    value={val.join(", ")}
                    readOnly
                  />
                </div>
              );
            }

            // Primitive value
            return (
              <div key={fieldName} className="mb-4">
                <small className="d-block text-uppercase">{displayLabel}</small>

                {isDateTime ? (
                  <div name={fieldName}>
                    <Controller
                      name={fieldName}
                      control={control}
                      defaultValue={val ?? ""}
                      render={({ field }) => {
                        const dateValue = field.value ? parseISO(field.value) : null;

                        return (
                          <DatePicker
                            selected={dateValue}
                            onChange={(date: Date | null) => {
                              if (!date) return;

                              // Convert back to ISO string for form submission
                              const isoString = formatISO(date, { representation: "complete" });
                              field.onChange(isoString);

                              // Mark field as modified
                              //handleInputModified(dateInputRef.current);
                              handleInputModified(fieldName);
                            }}
                            onChangeRaw={handleInputModified}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15} // choose step interval
                            dateFormat="yyyy-MM-dd HH:mm" // display format
                            className={`form-control mt-2 ${isReadonly ? "bg-gray-100" : ""}`}
                            disabled={isReadonly}
                          />
                        );
                      }}
                    />
                  </div>
                ) : typeof val === "string" && val.length > 100 ? (
                  <textarea
                    {...register(fieldName)}
                    defaultValue={val ?? ""}
                    readOnly={isReadonly}
                    className={`border p-2 rounded w-full min-h-[100px] ${
                      isReadonly ? "bg-gray-100" : ""
                    }`}
                    onInput={handleInputModified}
                  />
                ) : (
                  <input
                    {...register(fieldName)}
                    defaultValue={val ?? ""}
                    readOnly={isReadonly}
                    className={`form-control mt-2 ${isReadonly ? "bg-gray-100" : ""}`}
                    onInput={handleInputModified}
                  />
                )}
              </div>
            );
          };

          // Start recursion with the key as the first path segment
          return renderField(value, [key]);
        })}

        {arrayFields
          .filter(([key]) => !HIDDEN_FIELDS.includes(key))
          .map(([key]) => (
          <ArrayEditor key={key} name={key} />
        ))}

        <DetailLink datasetId={id}>
          <button className="btn btn-primary" style={{ marginTop: '20px' }}>
            Cancel 
          </button>
        </DetailLink>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{ marginTop: '20px', marginLeft: '20px' }}  // adjust px as needed
        >
          Save Changes
        </button>


        {statusMessage && (
          <div className={`mt-4 p-3 rounded ${statusType === "success" ? "alert alert-success" : "alert alert-danger"}`}>
            {statusMessage}
          </div>
        )}

      </form>
    </div>
  );


}
