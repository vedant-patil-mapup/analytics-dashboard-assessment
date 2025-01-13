import streamlit as st
import pandas as pd

try:
    import plotly.express as px
    print("Plotly is successfully imported")
except ModuleNotFoundError:
    print("Plotly is not installed or cannot be found.")


# Set up the Streamlit app
st.set_page_config(page_title="EV Population Dashboard", layout="wide")
st.title("Electric Vehicle (EV) Population Dashboard")

# Sidebar for uploading data
st.sidebar.header("Upload Data")
data_file = st.sidebar.file_uploader("Upload CSV File", type=["csv"])

if data_file:
    # Load dataset
    data = pd.read_csv(data_file)

    # Show a preview of the dataset
    if st.sidebar.checkbox("Show Dataset Preview"):
        st.write("### Dataset Preview", data.head())

    # Display key insights and visualizations
    st.header("Key Insights")

    # Insight 1: Total EVs by Year
    if "Model Year" in data.columns:
        evs_by_year = data["Model Year"].value_counts().reset_index()
        evs_by_year.columns = ["Model Year", "Count"]
        evs_by_year = evs_by_year.sort_values(by="Model Year")

        st.subheader("EVs by Model Year")
        fig = px.bar(evs_by_year, x="Model Year", y="Count", title="EVs by Model Year", text_auto=True)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("Column 'Model Year' not found in the dataset.")

    # Insight 2: EV Distribution by Make
    if "Make" in data.columns:
        evs_by_make = data["Make"].value_counts().reset_index()
        evs_by_make.columns = ["Make", "Count"]

        st.subheader("EV Distribution by Make")
        fig = px.pie(evs_by_make, values="Count", names="Make", title="EV Distribution by Make", hole=0.4)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("Column 'Make' not found in the dataset.")

    # Insight 3: EV Distribution by State
    if "State" in data.columns:
        evs_by_state = data["State"].value_counts().reset_index()
        evs_by_state.columns = ["State", "Count"]

        st.subheader("EV Distribution by State")
        fig = px.bar(evs_by_state, x="State", y="Count", title="EV Distribution by State", text_auto=True)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("Column 'State' not found in the dataset.")

else:
    st.info("Please upload a dataset to proceed.")
