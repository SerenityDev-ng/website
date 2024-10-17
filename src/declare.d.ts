declare module "naija-state-local-government" {
  export interface LgaResponse {
    lgas: string[];
    senetorial_districts: string[];
    state: string;
  }

  export interface State {
    state: string;
    lga: string[];
  }

  export interface NaijaStates {
    /**
     * Returns all states and their local governments
     */
    all(): State[];

    /**
     * Returns all Nigeria states
     */
    states(): string[];

    /**
     * Returns the local governments of the input state
     * @param state Nigeria state name (not case sensitive)
     */
    lgas(state: string): LgaResponse;
  }

  const naijaStates: NaijaStates;
  export default naijaStates;
}
