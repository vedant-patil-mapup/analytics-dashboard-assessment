import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

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
        fig, ax = plt.subplots(figsize=(10, 6))
        sns.barplot(data=evs_by_year, x="Model Year", y="Count", palette="viridis", ax=ax)
        ax.set_title("EVs by Model Year", fontsize=16)
        ax.set_xlabel("Model Year", fontsize=14)
        ax.set_ylabel("Count", fontsize=14)
        st.pyplot(fig)
    else:
        st.warning("Column 'Model Year' not found in the dataset.")

    # Insight 2: EV Distribution by Make
    if "Make" in data.columns:
        evs_by_make = data["Make"].value_counts().reset_index()
        evs_by_make.columns = ["Make", "Count"]

        st.subheader("EV Distribution by Make")
        fig, ax = plt.subplots(figsize=(8, 8))
        ax.pie(
            evs_by_make["Count"], 
            labels=evs_by_make["Make"], 
            autopct="%1.1f%%", 
            startangle=140, 
            colors=sns.color_palette("pastel")
        )
        ax.set_title("EV Distribution by Make", fontsize=16)
        st.pyplot(fig)
    else:
        st.warning("Column 'Make' not found in the dataset.")

    # Insight 3: EV Distribution by State
    if "State" in data.columns:
        evs_by_state = data["State"].value_counts().reset_index()
        evs_by_state.columns = ["State", "Count"]

        st.subheader("EV Distribution by State")
        fig, ax = plt.subplots(figsize=(12, 6))
        sns.barplot(data=evs_by_state, x="State", y="Count", palette="coolwarm", ax=ax)
        ax.set_title("EV Distribution by State", fontsize=16)
        ax.set_xlabel("State", fontsize=14)
        ax.set_ylabel("Count", fontsize=14)
        plt.xticks(rotation=45, ha="right")
        st.pyplot(fig)
    else:
        st.warning("Column 'State' not found in the dataset.")

else:
    st.info("Please upload a dataset to proceed.")
