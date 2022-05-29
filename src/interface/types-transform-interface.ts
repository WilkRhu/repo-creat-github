interface TypeTransformIssues {
  readonly title: string;
  readonly user: { login: string };
  readonly labels: [any];
}

interface TypeTransformUseRepo {
  readonly user: string;
  readonly repository: string;
}

interface TypeTransformContributors {
  readonly login: string;
  readonly contributions: number;
}

export { TypeTransformIssues, TypeTransformUseRepo, TypeTransformContributors };
