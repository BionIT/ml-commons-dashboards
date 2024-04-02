/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppMountParameters } from '../../../src/core/public';
import { MLServices } from './types';
import { MlCommonsPluginApp } from './components/app';
import { InnerHttpProvider } from './apis/inner_http_provider';
import { APIProvider } from './apis/api_provider';
import { OpenSearchDashboardsContextProvider } from '../../../src/plugins/opensearch_dashboards_react/public';

export const renderApp = (
  { element, history, appBasePath, setHeaderActionMenu }: AppMountParameters,
  services: MLServices
) => {
  InnerHttpProvider.setHttp(services.http);
  const DataSourceMenu = services.dataSourceManagement?.ui.getDataSourceMenu();

  ReactDOM.render(
    <Router history={history}>
      <OpenSearchDashboardsContextProvider services={services}>
        <services.i18n.Context>
          <MlCommonsPluginApp
            basename={appBasePath}
            notifications={services.notifications}
            http={services.http}
            navigation={services.navigation}
            chrome={services.chrome}
            data={services.data}
            uiSettingsClient={services.uiSettings}
          />
        </services.i18n.Context>
      </OpenSearchDashboardsContextProvider>
      {DataSourceMenu && (
        <DataSourceMenu
          componentType="DataSourceSelectable"
          componentConfig={{
            notifications: services.notifications,
            savedObjects: services.savedObjects.client,
          }}
          setMenuMountPoint={setHeaderActionMenu}
        />
      )}
    </Router>,
    element
  );

  return () => {
    ReactDOM.unmountComponentAtNode(element);
    InnerHttpProvider.setHttp(undefined);
    APIProvider.clear();
  };
};
