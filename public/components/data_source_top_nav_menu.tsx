/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useContext, useEffect } from 'react';

import { CoreStart, MountPoint, SavedObjectsStart } from '../../../../src/core/public';
import { DataSourceManagementPluginSetup } from '../../../../src/plugins/data_source_management/public';
import { DataSourcePluginSetup } from '../../../../src/plugins/data_source/public';
import { DataSourceContext } from '../contexts/data_source_context';

interface DataSourceTopNavMenuProps {
  notifications: CoreStart['notifications'];
  savedObjects: SavedObjectsStart;
  dataSource?: DataSourcePluginSetup;
  dataSourceManagement?: DataSourceManagementPluginSetup;
  setActionMenu: (menuMount: MountPoint | undefined) => void;
}

export const DataSourceTopNavMenu = ({
  dataSource,
  savedObjects,
  notifications,
  setActionMenu,
  dataSourceManagement,
}: DataSourceTopNavMenuProps) => {
  const dataSourceEnabled = !!dataSource?.dataSourceEnabled;
  const DataSourceMenu = useMemo(
    () => (dataSourceEnabled ? dataSourceManagement?.ui.getDataSourceMenu() : null),
    [dataSourceEnabled, dataSourceManagement]
  );
  const {
    selectedDataSourceOption,
    setSelectedDataSourceOption,
    setDataSourceEnabled,
  } = useContext(DataSourceContext);
  const activeOption = useMemo(() => (selectedDataSourceOption ? [selectedDataSourceOption] : []), [
    selectedDataSourceOption,
  ]);

  useEffect(() => {
    setDataSourceEnabled(dataSourceEnabled);
  }, [dataSourceEnabled]);

  if (!DataSourceMenu) {
    return null;
  }
  return (
    <DataSourceMenu
      componentType="DataSourceSelectable"
      componentConfig={{
        notifications,
        savedObjects: savedObjects.client,
        onSelectedDataSources: setSelectedDataSourceOption,
        activeOption,
      }}
      setMenuMountPoint={setActionMenu}
    />
  );
};
