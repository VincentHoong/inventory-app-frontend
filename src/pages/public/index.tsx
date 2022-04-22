import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";

const Index: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    )
}

export default Index;
