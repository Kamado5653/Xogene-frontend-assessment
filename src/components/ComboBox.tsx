import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

type ComboBoxProps = {
  values: any[];
  onSelectedChange: (val: any) => void;
  query: string;
  setQuery: (s: string) => void;
};
const ComboBox = ({
  values,
  onSelectedChange,
  query,
  setQuery,
}: ComboBoxProps) => {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  // const [query, setQuery] = useState("");

  function setSelectedProxy(value: any) {
    setSelectedPerson(value);
    onSelectedChange(value);
  }

  return (
    <Combobox value={selectedPerson} onChange={setSelectedProxy}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <ComboboxInput
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            displayValue={(rx) => JSON.stringify(rx)}
            onChange={(event) => {
              setQuery(event.target.value || "");
            }}
          />
          {/* <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button> */}
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {values.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              values.map((val: any) => (
                <ComboboxOption
                  key={val.id}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      focus ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={val}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {val.name}
                      </span>
                      {/* {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
};

export default ComboBox;
