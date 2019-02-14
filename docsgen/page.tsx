import * as React from "react";
import { Markdown } from "./markdown";
import { PageModel } from "./pageModel";
import { Sidebar } from "./sidebar";
import { component } from "./style";

interface IPageProps {
    pages: PageModel[];
    pageIndex: number;
}

export const Page: React.FunctionComponent<IPageProps> = ({ pages, pageIndex }) => {
    const page = pages[pageIndex];
    return (
        <Container>
            <Sidebar pages={pages} selectedIndex={pageIndex} />
            <Contents>
                <Body>
                    <div id="top" />
                    <Markdown root={page.root} />
                    <EndMatter>
                        <a href="https://github.com/jscheiny/safe-units">Safe Units</a> is developed by Jonah
                        Scheinerman. Please <a href="mailto:jonah@scheinerman.net">contact me</a> if you have questions
                        or concerns.
                        <img src="https://img.shields.io/npm/v/safe-units.svg" />
                        <img src="https://travis-ci.org/jscheiny/safe-units.svg?branch=master" />
                        <a
                            className="github-button"
                            href="https://github.com/jscheiny/safe-units"
                            data-icon="octicon-star"
                            aria-label="Star jscheiny/safe-units on GitHub"
                        >
                            Star
                        </a>
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
    marginTop: 25,
});
