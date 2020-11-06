import React, {ReactElement, useContext} from "react";
import {AuthContext} from "../src/AuthContext";
import {useRouter} from "next/router";

interface Props {
    authenticatedView: ReactElement;
    loadingView: ReactElement;
    anonView: ReactElement;
    authHref?: string;
    loadingHref?: string;
    anonHref?: string;
}

const AuthSwitcher: React.FC<Props> = ({authenticatedView,
                                           loadingView,
                                           anonView,
                                           authHref,
                                           loadingHref,
                                           anonHref}) => {
    const {authState} = useContext(AuthContext)
    const router = useRouter()

    switch (authState.status) {
        case("in"):
            if (authHref) {
                router.push(authHref)
            }
            return authenticatedView
        case("loading"):
            if (loadingHref) {
                router.push(loadingHref)
            }
            return loadingView
        case("out"):
            if (anonHref) {
                router.push(anonHref)
            }
            return anonView
        default:
            return loadingView
    }
}

export default AuthSwitcher