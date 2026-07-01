import styled from '@emotion/styled'

export const StyledPageContainer = styled.div`
  --kc-highlight: #0084ff;
  --border-kc-primary: #dcdcdc;

  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(146, 204, 247, 0.3) 0%, rgba(128, 188, 232, 0.3) 50%, rgba(104, 166, 212, 0.3) 100%);
  width: 100vw;
  height: 100vh;
`

export const StyledPlansContainer = styled.div`
  flex-grow: 1;
  border-radius: 0.375rem;
  border: 1px solid var(--border-kc-primary);

  @media (min-width: 0px) and (max-width: 767px) {
    // Select all direct children but not last 1
    & > *:not(:nth-last-child(-n + 1)) {
      border-bottom: 1px solid var(--border-kc-primary);
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    // Select odd direct children
    & > *:nth-of-type(odd) {
      border-right: 1px solid var(--border-kc-primary);
    }
    // Select all direct children but not last 2
    & > *:not(:nth-last-child(-n + 2)) {
      border-bottom: 1px solid var(--border-kc-primary);
    }
  }

  @media (min-width: 1280px) {
    // Select all direct children except the first one
    & > *:not(:first-child) {
      border-left: 1px solid var(--border-kc-primary);
    }
  }
`
