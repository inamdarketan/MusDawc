import { Component, type ReactNode } from 'react';

type State = { error: Error | null };
export class ErrorBoundary extends Component<{children: ReactNode}, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  render() {
    if (this.state.error) return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#211b18',color:'#efe4cc',fontFamily:'system-ui,sans-serif'}}><section style={{maxWidth:520,padding:28,border:'1px solid #80664f',borderRadius:12,background:'#302720'}}><p style={{color:'#dca568',letterSpacing:2,fontSize:11}}>MUSDAWC · DECK ERROR</p><h1 style={{fontFamily:'Georgia,serif',fontWeight:500}}>The deck needs a moment.</h1><p>MusDawc could not render this screen. Reload the page to try again.</p><details><summary>Technical details</summary><pre style={{whiteSpace:'pre-wrap',fontSize:12}}>{this.state.error.message}</pre></details></section></main>;
    return this.props.children;
  }
}
