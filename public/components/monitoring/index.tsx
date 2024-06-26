/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiPanel,
  EuiPageHeader,
  EuiSpacer,
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiFilterGroup,
} from '@elastic/eui';
import React, { useState, useRef, useCallback } from 'react';

import { ModelDeploymentProfile } from '../../apis/profile';
import { RefreshInterval } from '../common/refresh_interval';
import { PreviewPanel } from '../preview_panel';

import { ModelDeploymentItem, ModelDeploymentTable } from './model_deployment_table';
import { useMonitoring } from './use_monitoring';
import { ModelStatusFilter } from './model_status_filter';
import { SearchBar } from './search_bar';
import { ModelSourceFilter } from './model_source_filter';
import { ModelConnectorFilter } from './model_connector_filter';

export const Monitoring = () => {
  const {
    pageStatus,
    params,
    pagination,
    deployedModels,
    handleTableChange,
    resetSearch,
    searchByNameOrId,
    reload,
    searchByStatus,
    searchBySource,
    searchByConnector,
    allExternalConnectors,
  } = useMonitoring();
  const [preview, setPreview] = useState<{
    model: ModelDeploymentItem;
    dataSourceId: string | undefined;
  } | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>();

  const setInputRef = useCallback((node: HTMLInputElement | null) => {
    searchInputRef.current = node;
  }, []);

  const onResetSearch = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    resetSearch();
  }, [resetSearch]);

  const handleViewDetail = useCallback(
    (modelPreviewItem: ModelDeploymentItem) => {
      // This check is for type safe, the data source id won't be invalid or fetching if model can be previewed.
      if (typeof params.dataSourceId !== 'symbol') {
        setPreview({ model: modelPreviewItem, dataSourceId: params.dataSourceId });
      }
    },
    [params.dataSourceId]
  );

  const onCloseModelPreview = useCallback(
    (modelProfile: ModelDeploymentProfile | null) => {
      if (
        modelProfile !== null &&
        (preview?.model?.planningNodesCount !== modelProfile.target_worker_nodes?.length ||
          preview?.model?.respondingNodesCount !== modelProfile.worker_nodes?.length)
      ) {
        reload();
      }
      setPreview(null);
    },
    [preview, reload]
  );

  return (
    <div>
      <EuiSpacer size="s" />
      <EuiSpacer size="xs" />
      <EuiPageHeader
        pageTitle="Overview"
        rightSideItems={[<RefreshInterval onRefresh={reload} />]}
      />
      <EuiSpacer size="m" />
      <EuiPanel>
        <EuiText size="s">
          <h2>
            Models{' '}
            {pageStatus !== 'empty' && (
              <EuiTextColor aria-label="total number of results" color="subdued">
                ({pagination?.totalRecords ?? 0})
              </EuiTextColor>
            )}
          </h2>
        </EuiText>

        <EuiSpacer size="m" />
        {pageStatus !== 'empty' && (
          <>
            <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                <SearchBar inputRef={setInputRef} onSearch={searchByNameOrId} />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFilterGroup>
                  <ModelSourceFilter value={params.source} onChange={searchBySource} />
                  <ModelConnectorFilter
                    value={params.connector}
                    onChange={searchByConnector}
                    allExternalConnectors={allExternalConnectors}
                    dataSourceId={params.dataSourceId}
                  />
                  <ModelStatusFilter selection={params.status} onChange={searchByStatus} />
                </EuiFilterGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="m" />
          </>
        )}

        <ModelDeploymentTable
          noTable={pageStatus === 'empty'}
          loading={pageStatus === 'loading'}
          items={deployedModels}
          sort={params.sort}
          pagination={pagination}
          onChange={handleTableChange}
          onViewDetail={handleViewDetail}
          onResetSearchClick={onResetSearch}
        />
        {preview && (
          <PreviewPanel
            model={preview.model}
            onClose={onCloseModelPreview}
            dataSourceId={preview.dataSourceId}
          />
        )}
      </EuiPanel>
    </div>
  );
};
