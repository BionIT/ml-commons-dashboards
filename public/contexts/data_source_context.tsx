import React from 'react';
import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { DataSourceOption } from '../../../../src/plugins/data/public';

export const DataSourceContext = createContext<{
  selectedDataSourceOption: DataSourceOption | null;
  setSelectedDataSourceOption: Dispatch<SetStateAction<DataSourceOption | null>>;
  dataSourceEnabled: boolean | null;
  setDataSourceEnabled: Dispatch<SetStateAction<boolean | null>>;
}>({
  selectedDataSourceOption: null,
  setSelectedDataSourceOption: () => null,
  dataSourceEnabled: null,
  setDataSourceEnabled: () => null,
});

const { Provider, Consumer } = DataSourceContext;

export const DataSourceContextProvider = ({
  children,
  initialValue,
}: React.PropsWithChildren<{
  initialValue?: {
    selectedDataSourceOption?: DataSourceOption;
    dataSourceEnabled?: boolean;
  };
}>) => {
  const [selectedDataSourceOption, setSelectedDataSourceOption] = useState<DataSourceOption | null>(
    initialValue?.selectedDataSourceOption ?? null
  );
  const [dataSourceEnabled, setDataSourceEnabled] = useState<boolean | null>(
    initialValue?.dataSourceEnabled ?? null
  );
  const value = useMemo(
    () => ({
      selectedDataSourceOption,
      setSelectedDataSourceOption,
      dataSourceEnabled,
      setDataSourceEnabled,
    }),
    [selectedDataSourceOption, setSelectedDataSourceOption, dataSourceEnabled, setDataSourceEnabled]
  );
  return <Provider value={value}>{children}</Provider>;
};

export const DataSourceContextConsumer = Consumer;
