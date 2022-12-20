import * as React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Link from './link';

import config from '../../config.js';
import { DarkModeSwitch } from './DarkModeSwitch';

import {
  NavBarWrapper,
  NavBarDefault,
  HeaderNav,
  NavBarHeader,
  NavBarRight,
  UlHeader,
  LiHeader,
} from './HeaderStyled';

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];
const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 767px) {
    display: block;
  }
`;

const Divider = styled((props) => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <LiHeader className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </LiHeader>
  );
})`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${(props) => 2 + (props.level || 0) * 1}rem;

    position: relative;

    &:hover {
      color: #1ed3c6 !important;
    }

    ${(props) =>
      props.active &&
      `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

import Tree from './sidebar/tree';
import { ExternalLink } from 'react-feather';

const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <NavBarWrapper>
          <NavBarDefault>
            <NavBarHeader>
              <Link to="/" className={'navBarBrand'}>
                <img
                  className={'img-responsive displayInline'}
                  src="https://www.docs.computervision.com.vn/static/logo-cvs-8d7e167d315ede0146bebe3e494a5898.svg"
                  alt="logoCVS"
                />
              </Link>

              <NavBarRight>
                <UlHeader className={'sideBarUL'}>
                  <Link to="/apiOne">Api v1</Link>
                  <Link to="/apitwo">Api v2</Link>
                </UlHeader>

                <div id="navbar" className={'topnav'}>
                  <ul className={'navBarUL navBarNav navBarULRight'}>
                    <li>
                      <DarkModeSwitch
                        isDarkThemeActive={isDarkThemeActive}
                        toggleActiveTheme={toggleActiveTheme}
                      />
                    </li>
                  </ul>
                </div>
              </NavBarRight>
            </NavBarHeader>
          </NavBarDefault>
        </NavBarWrapper>
      );
    }}
  />
);

export default Header;
