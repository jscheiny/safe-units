import * as React from "react";
import { classes, style } from "typestyle";
import { MarkdownChildren } from "./markdown";
import { PageModel } from "./pageModel";
import { component, styles } from "./style";

interface ISidebarProps {
    pages: PageModel[];
    selectedIndex: number;
}

export const Sidebar: React.FunctionComponent<ISidebarProps> = ({ pages, selectedIndex }) => {
    const pageSections = pages[selectedIndex].sections.filter(({ level }) => level <= 3).map(({ id, node, level }) => {
        const className = classes(level === 2 && section, level === 3 && subsection);
        return (
            <SectionLink key={id} href={`#${id}`} className={className}>
                <MarkdownChildren root={node} />
            </SectionLink>
        );
    });

    const links = pages.map((page, index) => {
        const isSelected = index === selectedIndex;
        const className = classes(index === 0 ? homeLink : pageLink, isSelected && selectedPage);
        const hash = isSelected ? "#top" : "";
        return (
            <LinkSection key={page.name}>
                <PageLink href={`${page.path}${hash}`} className={className}>
                    {page.title}
                </PageLink>
                {isSelected ? pageSections : null}
            </LinkSection>
        );
    });

    return (
        <Container>
            {links}
            <PageLink className={homeLink} href="https://github.com/jscheiny/safe-units">
                View on github
            </PageLink>
        </Container>
    );
};

const HOME_COLOR = "#A82A2A";
const LINK_COLOR = "#293742";

const Container = component("sidebar", "div", {
    minWidth: 250,
    overflow: "auto",
    fontSize: 14,
});

const link = styles({
    display: "block",
    color: "#293742",
    textDecoration: "none",
});

const PageLink = component("page-link", "a", {
    ...link,
    margin: "5px 0",
    padding: "5px 10px",
    background: "#E1E8ED",
    fontWeight: "bold",
    $nest: {
        "&:hover": {
            background: "#BFCCD6",
        },
    },
});

const homeLink = style({
    color: HOME_COLOR,
});

const pageLink = style({
    color: LINK_COLOR,
});

const selectedPage = style({
    color: "#F5F8FA",
    background: "#A82A2A",
    $nest: {
        "&:hover": {
            background: "#A82A2A",
            color: "#CED9E0",
        },
    },
});

const SectionLink = component("section-link", "a", {
    ...link,
    color: LINK_COLOR,
    $nest: {
        "&:hover": {
            background: "#E1E8ED",
        },
    },
});

const section = style({
    $debugName: "section",
    padding: "3px 20px",
});

const subsection = style({
    $debugName: "subsection",
    padding: "3px 40px",
    color: "#5C7080",
});

const LinkSection = component("links", "div", {
    $nest: {
        "&:last-child": {
            marginBottom: 20,
        },
        "&:first-child": {
            marginTop: 20,
        },
    },
});
