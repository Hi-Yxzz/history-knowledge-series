import type {RightsStatus, SourceType} from "../types";

const rightsLabels: Record<RightsStatus, string> = {
  candidate: "候选素材",
  "pending-permission": "待作者授权",
  licensed: "已获授权",
  open: "开放许可",
};

const sourceLabels: Record<SourceType, string> = {
  youtube: "YouTube",
  archive: "档案素材",
  generated: "AI复原",
  remotion: "动画示意",
};

export const SourceBadge: React.FC<{
  sourceType: SourceType;
  rightsStatus: RightsStatus;
}> = ({sourceType, rightsStatus}) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      fontSize: 24,
      letterSpacing: 1,
    }}
  >
    <span style={{padding: "8px 14px", backgroundColor: "rgba(20,18,15,0.82)", color: "#fff"}}>
      {sourceLabels[sourceType]}
    </span>
    <span style={{padding: "8px 14px", backgroundColor: "#d8c49c", color: "#2b251a"}}>
      {rightsLabels[rightsStatus]}
    </span>
  </div>
);
