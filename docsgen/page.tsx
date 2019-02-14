import * as React from "react";
import { Link, Markdown } from "./markdown";
import { PageModel } from "./pageModel";
import { Sidebar } from "./sidebar";
import { component } from "./style";

interface IPageProps {
    pages: PageModel[];
    pageIndex: number;
}

export const Page: React.FunctionComponent<IPageProps> = ({ pages, pageIndex }) => {
    const page = pages[pageIndex];
    const year = new Date().getFullYear();
    return (
        <Container>
            <Sidebar pages={pages} selectedIndex={pageIndex} />
            <Contents>
                <Body>
                    <div id="top" />
                    <Markdown root={page.root} />
                    <EndMatter>
                        <Link href="https://github.com/jscheiny/safe-units">Safe Units</Link> is developed by Jonah
                        Scheinerman. Please <Link href="mailto:jonah@scheinerman.net">contact me</Link> if you have
                        questions or concerns.
                        <License>
                            Safe Units is distributed under the{" "}
                            <Link href="https://opensource.org/licenses/MIT">MIT open source license</Link>.
                            <br />
                            <br />
                            Copyright © {year} by Jonah Scheinerman
                        </License>
                    </EndMatter>
                </Body>
            </Contents>
        </Container>
    );
};

const Container = component("page", "div", {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
});

const Contents = component("contents", "div", {
    overflow: "auto",
    flex: "1 1 auto",
    position: "relative",
    background: "#EBF1F5",
    boxShadow: "inset 15px 0 20px -20px #182026",
});

const Body = component("body", "div", {
    maxWidth: 800,
    margin: "0 25px 25px 45px",
});

const EndMatter = component("end-matter", "div", {
    borderTop: "1px solid #BFCCD6",
    marginTop: 20,
    paddingTop: 20,
    fontSize: 14,
});

const License = component("license", "div", {
    marginTop: 20,
    textAlign: "center",
    color: "#738694",
    textShadow: "0 1px 0 white",
    fontSize: 12,
});
