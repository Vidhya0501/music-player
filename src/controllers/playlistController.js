import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import Song from "../models/Song.js";

const getPlaylists = async (req, res) => {
	try {
        const playlists = await Playlist.find({});

	if (!playlists) {
		return res.status(400).send({ message: "An error occured" });
	}

	res.status(200).send(playlists);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
};

const createPlaylist = async (req, res) => {
	try {
        const { id, username } = req.user;
	const { title, description, songIds } = req.body;
	const user = await User.findById(id);

	if (!title || !songIds) {
		return res.status(400).send({ message: "All fields are required!" });
	}

	if (!user) {
		return res.status(404).send({ message: "User not found!" });
	}

	await Promise.all(
		songIds.map(async (id) => {
			const songExists = await Song.findById(id);
			if (!songExists) {
				return res.status(404).send({ message: "Song not found" });
			}
		})
	);

	const newPlaylist = await Playlist.create({
		title,
		description,
		userId: id,
		userName: username,
		songs: songIds
	});

	if (!newPlaylist) {
		return res.status(400).send({ message: "An error occured!" });
	}

	user.playlists.push(newPlaylist.id);
	await user.save();

	res.status(201).send(newPlaylist);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
};

const getPlaylist = async (req, res) => {
	try {
		const { id } = req.params;

		const playlist = await Playlist.findById(id);

		if (!playlist) {
			return res.status(404).send({ message: "Playlist not found!" });
		}

		let songs = [];

		await Promise.all(
			playlist.songs.map(async (songId) => {
				const playlistSong = await Song.findById(songId);
				if (!playlistSong) {
					return res.status(404).send({ message: "Song not found" });
				} else {
					songs.push(playlistSong);
				}
			})
		);

		res.status(200).send({ ...playlist.toObject(), songs });
	} catch (error) {
		res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
	}
};

const editPlaylist = async (req, res) => {
	try {
        const { id } = req.params;
	const userId = req.user.id;
	const { title, description, songIds } = req.body;
	const playlist = await Playlist.findById(id);

	if (!title || !songIds) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	if (!playlist) {
		return res.status(400).json({ message: "Playlist not found!" });
	}

	if (playlist.userId !== userId) {
		return res
			.status(403)
			.json({ message: "You are not allowed to edit other users' playlists!" });
	}

	await Promise.all(
		songIds.map(async (id) => {
			const songExists = await Song.findById(id);
			if (!songExists) {
				return res.status(404).json({ message: "Song not found" });
			}
		})
	);

	const updatedPlaylist = await Playlist.findByIdAndUpdate(
		id,
		{ title, description, songs: songIds },
		{
			new: true,
		}
	);

	if (!updatedPlaylist) {
		return res.status(400).json({ message: "Playlist not updated!" });
	}
	res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
};

export default{
    getPlaylist,
    getPlaylists,
    createPlaylist,
    editPlaylist
}