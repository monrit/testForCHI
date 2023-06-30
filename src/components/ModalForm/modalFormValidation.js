export const modalFormValidation = {
    company: {
        required: "Company is required!",
        maxLength: {
            value: 18,
            message: "Try shorter name for your company",
        },
        minLength: {
            value: 2,
            message: "Company should be at least two symbols long",
        },
        pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Company can only contain latin letters",
        },
    },
    model: {
        required: "Model is required!",
        maxLength: {
            value: 18,
            message: "Try shorter name for your model",
        },
        minLength: {
            value: 2,
            message: "Model should be at least two symbols long",
        },
        pattern: {
            value: /^[a-zA-Z0-9 ]+$/,
            message: "Model can only contain latin letters and numbers",
        },
    },
    vin: {
        required: "VIN is required!",
        maxLength: {
            value: 20,
            message: "To long VIN",
        },
        minLength: {
            value: 5,
            message: "Your VIN is to short",
        },
        pattern: {
            value: /^[a-zA-Z0-9 ]+$/,
            message: "VIN can only contain latin letters and numbers",
        },
    },
    year: {
        required: "Year is required!",
        min: {
            value: 1900,
            message: "Your car is to old",
        },
        max: {
            value: 2024,
            message: "Your car is from future",
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Year can only contain numbers",
        },
    },
    color: {
        required: "Color is required!",
        maxLength: {
            value: 18,
            message: "Try shorter name for your color",
        },
        minLength: {
            value: 2,
            message: "Color should be at least two symbols long",
        },
        pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Color can only contain latin letters",
        },
    },
    price: {
        required: "Price is required!",
        min: {
            value: 1,
            message: "Your price is to low",
        },
        max: {
            value: 9999999.99,
            message: "Your price is to high",
        },
        pattern: {
            value: /^[0-9]+(\.[0-9]{2})?$/,
            message:
                "Price can only contain numbers, and if not an integer should have 2 decimal places",
        },
    },
    availability: {
        setValueAs: v => ((v === "true" || v === true) ? true : false),
    },
};
