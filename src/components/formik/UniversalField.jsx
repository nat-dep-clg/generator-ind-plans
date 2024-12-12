import {Field} from "formik";

const getDynamicClassName = (baseClasses, errorCondition) => {
    return `${baseClasses} ${errorCondition ? "border-red-500" : ""}`;
};

const UniversalFieldInput = ({ id, name, placeholder, className, field, props }) => (
    <input
        className={className}
        id={id}
        name={name}
        placeholder={props.disabled ? field.value : placeholder}
        {...field}
        {...props}
    />
);

const UniversalFieldTextarea = ({ id, name, placeholder, className, field, props }) => (
    <textarea
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        {...field}
        {...props}
    />
);

const UniversalFieldSelect = ({ id, name, options, className, field, props }) => (
    <select
        className={className}
        id={id}
        name={name}
        {...field}
        {...props}
    >
        {options && options.length > 0 ? (
            options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))
        ) : (
            <option value="" disabled>
                No options available
            </option>
        )}
    </select>
);

const validateFileType = (fileType) => {
    const validTypes = ["image/png", "image/jpeg", "application/pdf", "text/plain"];
    return validTypes.includes(fileType);
};

const UniversalField = ({ name, label, type = "text", placeholder = "", options = [], fileType = "", ...props }) => (
    <Field name={name}>
        {({ field, meta }) => (
            <>
                <label className="block font-bold mb-2" htmlFor={name}>{label}</label>
                {type === "textarea" ? (
                    <UniversalFieldTextarea
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner"
                        field={field}
                        props={props}
                    />
                ) : type === "file" ? (
                        <input
                            id={name}
                            name={name}
                            type="file"
                            className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-violet-50 file:text-violet-700
                                                hover:file:bg-violet-100"
                            onChange={(e) => {
                                console.log(field, e.target.files[0]);
                                field.onChange(e)

                            }}
                        />

                ) : type === "select" ? (
                    <UniversalFieldSelect
                        id={name}
                        name={name}
                        options={options}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner"
                        field={field}
                        props={props}
                    />
                ) : (
                    <UniversalFieldInput
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={getDynamicClassName(
                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner",
                            meta.touched && meta.error
                        )}
                        field={field}
                        props={props}
                    />
                )}
                {meta.touched && meta.error && (
                    <div className="error text-red-500">{meta.error}</div>
                )}
            </>
        )}
    </Field>
);

export default UniversalField;
