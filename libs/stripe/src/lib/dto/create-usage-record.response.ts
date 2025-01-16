import { BaseResponse } from './base.response';
import type { UsageRecordDto } from './stripe/usage-record.dto';

export class CreateUsageRecordResponse extends BaseResponse {
  usageRecord?: UsageRecordDto;
}
