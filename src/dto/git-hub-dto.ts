export class GitHubDto {
  readonly user: string;
  readonly repository: string;
  readonly issues: [
    {
      title: string;
      author: string;
      labels: string;
    },
  ];
  contributors: [
    {
      name: string;
      qt_commits: number;
    },
  ];
}
