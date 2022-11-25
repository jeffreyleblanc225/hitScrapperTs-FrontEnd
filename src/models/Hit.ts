export interface Hit {
  hit_set_id: string;
  url: string;
  title: string;
  requester_id: string | null | undefined;
  pay: number;
  description: string | null | undefined;
  isQueued: boolean;
  checkedThisCycle: boolean;
  createdAtUtc: Date;
  updatedAtUtc: Date;
}
