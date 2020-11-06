import QueryView from "../../component/QueryView";

const TodosQuery = `
  query {
  user {
    id
  }
}
`;

const ProjectPage = () => {
    return <QueryView title="hello" query={TodosQuery}>
        <h1>hello</h1>
    </QueryView>
}

export default ProjectPage