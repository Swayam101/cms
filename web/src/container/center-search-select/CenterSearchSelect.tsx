import React, { memo, useMemo, useRef, useState } from "react";
import classes from "./index.module.scss";
import { useGetCenterBySearch } from "../../hooks/centre/useGetCenterBySearch";
import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react";
import Court from "../../assets/icons/court";
import { Flex, Loader, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import useOnClickOutside from "./useOnClickOutside";

interface ISelectProps {
  value: string;
  onChange: (e: { value: string; label: string }) => void;
}

interface IOptions {
  value: string;
  label: string;
}

const CenterSearchSelect: React.FC<ISelectProps> = ({ value, onChange }) => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [label, setLabel] = useState("");
  const { data: centerSearch, isFetching } = useGetCenterBySearch(
    search.trim()
  );

  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const selectContainerRef = useRef(null);
  const clickOutsideHandler = () => setIsDropDownVisible(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const options: IOptions[] = useMemo(() => {
    if (Array.isArray(centerSearch?.data)) {
      return (
        centerSearch.data.map(
          ({ name, _id }: { name: string; _id: string }) => ({
            label: name,
            value: _id,
          })
        ) ?? []
      );
    }
    return [];
  }, [centerSearch]);

  return (
    <div className={classes.customDropDown} ref={selectContainerRef}>
      <div
        className={classes.customDropDownSelection}
        onClick={() => {
          setIsDropDownVisible(!isDropDownVisible);
        }}
      >
        <Flex align={"center"}>
          <Flex>
            <Court />
          </Flex>
          {value ? (
            <p className={classes.SelectItem}>
              {options.find((e) => e.value === value)?.label ?? label}
            </p>
          ) : (
            <p className={classes.placeHolder}>Select Option</p>
          )}
        </Flex>
        <IconChevronDown />
      </div>
      {isDropDownVisible && (
        <div className={classes.itemHolder}>
          <TextInput
            placeholder="Search...."
            mb={4}
            leftSection={<IconSearch size={18} />}
            onChange={(e) => setSearch(e.target.value)}
          />
          {options.length === 0 && !isFetching && (
            <Text>
              We couldn't find any centers for that input. Please try again!
            </Text>
          )}
          {options.length === 0 && isFetching && (
            <Flex justify={"center"}>
              <Loader color="blue" />
            </Flex>
          )}
          {options.map((item) => (
            <div
              key={item.value}
              className={classes.dropDownItem}
              onClick={() => {
                onChange(item);
                setLabel(item.label);
                setIsDropDownVisible(false);
                setSearch("");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{item.label}</div>

                {value && value === item.value && (
                  <div>
                    <IconCheck style={{ color: "#2C63E5" }} size={18} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CenterSearchSelect);
