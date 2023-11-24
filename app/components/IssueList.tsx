import { Issue } from "./Issue";

export const IssueList = (props: {
  issues: Array<{ name: string; id: number; cover: string }>;
}) => (
  <ul
    className="flex overflow-x-auto mt-4 p-4"
  >
    {props.issues.map((issue) => (
      <li key={issue.id}>
        <Issue title={issue.name} cover={issue.cover} />
      </li>
    ))}
  </ul>
);
