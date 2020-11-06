import {useQuery} from "urql";
import AppLayout from "./AppLayout";


const QueryView: React.FC<{query?: string; variables?: any; children: React.ReactElement; noDataView?: React.ReactElement; title?: string}> = ({query, variables, children, noDataView, title}) => {
    const [result] = useQuery({
        query: query,
        variables: variables
    });

    const { data, fetching, error } = result;

    return <AppLayout title={title} loading={fetching}>
        {data ? children : noDataView}
    </AppLayout>
}

export default QueryView