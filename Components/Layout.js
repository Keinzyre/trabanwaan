import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Link from "next/link";
import {
  Link as MUILink,
  AppBar,
  Avatar,
  Tooltip,
  Container,
  Typography,
  Box,
  Button,
  Toolbar,
} from "@mui/material";

import { signOut, useSession } from "next-auth/react";

let pages = ["explore", "sign up", "log in"];

export default function Layout(props) {
  const { data: session, status } = useSession();
  /* console.log(session, status, "session & status in Layout"); */
  /* console.log(status, "Status  in layout"); */
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  if (status === "loading") {
    pages = [];
  }

  useEffect(() => {
    if (session && status === "authenticated") {
      pages = ["my task", "explore"];
      /* console.log("useeffect if check"); */
      setAvatar(session.user.avatar);
    }
  }, [status]);

  if (!session && status === "unauthenticated") {
    pages = ["explore", "sign up", "log in"];
  }

  const logoutHandler = () => {
    signOut({ callbackUrl: "/login" });
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  /*   console.log(props.layout) */
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ mr: 2 }}>
          {/* App Name Desktop */}

          <Link href="/" passHref>
            <MUILink
              variant="h6"
              color="inherit"
              underline="none"
              sx={{ flexGrow: 1, mr: 2, display: { xs: "none", md: "flex" } }}
            >
              TrabanWaan
            </MUILink>
          </Link>

          {/* Menu AppBar Mobile */}

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    href={{
                      pathname: `/${page.replace(/\s+/g, "")}/${
                        page === "my task" ? session.user._id : ""
                      }`,
                    }}
                    passHref
                  >
                    <Typography
                      align="center"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* App Name Mobile */}

          <Link href="/">
            <MUILink
              color="inherit"
              variant="h6"
              underline="none"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              TrabanWaan
            </MUILink>
          </Link>

          {/* Menu AppBar Desktop */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={{
                  pathname: `/${page.replace(/\s+/g, "")}/${
                    page === "my task" ? session.user._id : ""
                  }`,
                }}
                passHref
              >
                <Button
                  variant="text"
                  onClick={handleCloseNavMenu}
                  color="inherit"
                  sx={{
                    my: 2,
                    display: "block",
                    /* "&:hover": { filter:"brightness(.85)" }, */
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Theme Toggle */}

          <Box sx={{ flexGrow: 0, pr: 1 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => props.onClickTheme(true)}
              color="inherit"
            >
              {props.layout === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>

          {/* Profile Settings */}
          {session && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={avatar}
                    alt="User"
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {session.user.accountType === "worker" && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href={"/profile/" + session.user._id} passHref>
                      <Typography textAlign="center">Profile</Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/account" passHref>
                    <Typography textAlign="center">Account</Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    logoutHandler();
                  }}
                >
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
