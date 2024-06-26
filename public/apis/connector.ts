/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONNECTOR_API_ENDPOINT,
  INTERNAL_CONNECTOR_API_ENDPOINT,
} from '../../server/routes/constants';
import { InnerHttpProvider } from './inner_http_provider';

export interface GetAllConnectorResponse {
  data: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  total_connectors: number;
}

interface GetAllInternalConnectorResponse {
  data: string[];
}

export class Connector {
  public getAll({ dataSourceId }: { dataSourceId?: string }) {
    return InnerHttpProvider.getHttp().get<GetAllConnectorResponse>(CONNECTOR_API_ENDPOINT, {
      query: {
        data_source_id: dataSourceId,
      },
    });
  }

  public getAllInternal({ dataSourceId }: { dataSourceId?: string }) {
    return InnerHttpProvider.getHttp().get<GetAllInternalConnectorResponse>(
      INTERNAL_CONNECTOR_API_ENDPOINT,
      {
        query: {
          data_source_id: dataSourceId,
        },
      }
    );
  }
}
